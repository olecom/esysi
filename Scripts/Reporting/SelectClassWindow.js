Ext.define('ManAcc.Reporting.SelectClassWindow', {
            extend: 'Ext.window.Window',
			alias: 'widget.selectwin',
            title: config.ttlChooseClass,
			requires: [config.classFormChooseRecord],
			fieldlink: null,
			
            width: 300,
            height: 400,
            layout: 'fit',
            resizable: true,
            margin: 0,
            padding: 0,
            autoScroll: true,
            modal: true,		
			
			initComponent: function() {
			  
			  var me = this;
			
			  this.items = [
			{           xtype: 'choosepanel',
                        name: 'fieldValue',

                        fieldLabel: config.ttlValue,
                        allowBlank: false,
                        value: this.fieldlink?this.fieldlink.getValue():'',
						checkbox: true,

                        onValueSelected: function (panel) {
	                        that.methodOnSave();
                            that.close();
                        },
						
						getTreeData: function() {
						        var response = HostApi.ClassGetList();
		                        var treeitems = [];
		                          for(var i = 0; i<response.length; i++) {
		                                   response[i].title = response[i].Name;
		                                   response[i].parentId = 0;
		                                   response[i].children = [];
		                                   response[i].key = response[i].Id;
		                             }
									 
							 return response;
						},
						
						
						
						
                    }
			];
			
			    this.buttons = [{
                 text: config.ttlClose,
                 handler: function () {
                      me.close();
                 }
			    },
			
			    {
               text: config.ttlOk,
               handler: function () {
   
                me.methodOnSave();
				me.close();

               }
              }
			
			];
			
			   this.callParent();
			},
 			

        
		methodOnSave: function() {
             
             var value = this.down('choosepanel').getValue();
             var title = this.down('choosepanel').getTitle();
 
             this.fieldlink.setValue(value);
             this.fieldlink.setVisibleValue(title);			 
				
		}
		
		}
		
		
		
		
		
		)