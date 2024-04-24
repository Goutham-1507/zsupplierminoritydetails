sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"

], function (
    Controller,
    History,
    MessageToast
) {
    "use strict";

    return Controller.extend("zsupplierminoritydetails.controller.MinorityDetails", {
        onInit: function () {
            this._oDataModel = this.getOwnerComponent().getModel();
            var a = new sap.ui.model.json.JSONModel({
                mode: "display",
                editable: false
            });
            this.getView().setModel(a, "uiModel");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteMinorityDetails").attachPatternMatched(this.onRouteMatched, this);
            //this.getView().byId("MinorityListReport").bindElement("/MinorityStatusSet(CompanyCode'" + CompanyCode + "', Partner'" + Partner + "')");

        },
        onRouteMatched: async function (oEvent) {

            var CompanyCode = oEvent.getParameter("arguments").CompanyCode;
            var Partner = oEvent.getParameter("arguments").Partner;
            var MINDK = oEvent.getParameter("arguments").MINDK;
            // this.getView().bindElement("/MinorityStatusSet(CompanyCode'" + CompanyCode + "', Partner'" + Partner + "', MINDK'" + MINDK + "')");
        if( CompanyCode != ' ' && Partner != ' ' && MINDK != ' '){

       
            this.getView().bindElement({
                path: `/Z_C_MINORITYSTATUS(Bukrs='${CompanyCode}',Partner='${Partner}',Mindk='${MINDK}')`, events: {
                    dataRequested: function (oEvent) {
                        debugger
                    },
                    dataReceived: function (oEvent) {
                        debugger;

                    }.bind(this)
                }
            });
        }
        else{
            this.getView().getModel("uiModel").setData({
                mode: "create",
                editable: true
            }, true);
            var oContext = this._oDataModel.createEntry("/Z_C_MINORITYSTATUS",{
                properties: {
                    Bukrs : 'NJIT',
                    Partner : '2001'
                }
            });
            this.getView().setBindingContext(oContext);

        }


        },
        onEditPress: function (oEvent) {
            debugger;
            this.getView().getModel("uiModel").setData({ mode: "edit", editable: true }, true);
        },
        onDeletePress: async function (oEvent) {
            debugger;
            var oSmartForm = this.getView().byId("smartForm");


        },
        onCancelPress: function (oEvent) {
            sap.ui.core.BusyIndicator.hide();
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("RouteMinorityList", {}, true);
            }
        },
        onDiscardChanges: function (oEvent) {
            this._oDataModel.resetChanges();
            this.getView().getModel("uiModel").setData({
                mode: "display",
                editable: false
            }, true);
        },
        onSavePress: function (oEvent) {
            this._oDataModel.submitChanges({
                success: function (oData) {
                    var oRepsonse = Object.entries(oData).length && (oData.__batchResponses.length >= 1) && oData.__batchResponses[0].response ? oData.__batchResponses[0].response : Object.entries(oData).length && oData.__batchResponses[0].__changeResponses ? oData.__batchResponses[0].__changeResponses[0] : "";
                    if (oRepsonse && oRepsonse.statusCode < "300") {

                        if (oRepsonse.statusText === "Created") {
                            MessageToast.show("Minority Status created successfully for the Supplier");

                        } else {
                            MessageToast.show("Minority Status is Updated successfully");
                        }
                    } else if (oRepsonse.length === 0) {
                        MessageToast.show("No Changes Done");
                    } else {
                        sap.m.MessageBox.error(JSON.parse(oRepsonse.body).error.message.value);
                    }
                    this.getView().getModel("uiModel").setData({
                        mode: "display",
                        editable: false
                    }, true);
                    oView.setBusy(false);

                }.bind(this),
                error: function (oError) {
                    oView.setBusy(false);
                    sap.m.MessageBox.error(JSON.parse(oError.Response).error.message.value);
                }
            });

        },
        onDeletePress: function (oEvent) {
            this._oDataModel.remove(this.getView().getBindingContext().getPath(), {
                success: function (oData) {
                    sap.ui.core.BusyIndicator.hide();
                    var oHistory, sPreviousHash;
                    oHistory = History.getInstance();
                    sPreviousHash = oHistory.getPreviousHash();
                    if (sPreviousHash !== undefined) {
                        window.history.go(-1);
                    } else {
                        this.getOwnerComponent().getRouter().navTo("RouteMinorityList", {}, true);
                    }
                }.bind(this)
            });
        }




    });
});
