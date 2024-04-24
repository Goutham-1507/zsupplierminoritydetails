sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zsupplierminoritydetails.controller.MinorityList", {
            onInit: function () {
            },
  
                onCreateMinorityStatus : function (oEvent) {
                    debugger;
                    sap.ui.core.BusyIndicator.show();
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteMinorityDetails", {
                        CompanyCode: " ",
                        Partner: " ",
                        MINDK: " "
                    });
                    sap.ui.core.BusyIndicator.hide();
                  
                },
                onDeleteTableRow : function (){
    
                },
                onMinorityStatusPress : function (oEvent){
                    sap.ui.core.BusyIndicator.show();
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteMinorityDetails", {
                        CompanyCode: oEvent.getParameter("listItem").getBindingContext().getObject().Bukrs,
                        Partner: oEvent.getParameter("listItem").getBindingContext().getObject().Partner,
                        MINDK: oEvent.getParameter("listItem").getBindingContext().getObject().Mindk
                    });
                    sap.ui.core.BusyIndicator.hide();
    
                }
    
    
    
            });
        });
    
