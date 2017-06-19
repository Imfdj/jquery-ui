$(function() {

			var name = jQuery("#name"),
				log_name = jQuery("#log_name"),
				email = jQuery("#email"),
				password = jQuery("#password"),
				log_password = jQuery("#log_password"),
				repassword = jQuery("#repassword"),
				re_form = jQuery("#re_form"),
				allFields = jQuery([]).add(name).add(email).add(password).add(repassword),
				tips = jQuery(".validateTips");
				log_tips = jQuery(".log-validateTips");
			var timeout = null;
			function updateTips(t) {

				tips
					.text(t)
					.addClass("ui-state-highlight");
					timeout = setTimeout(function() {
						
						tips.removeClass("ui-state-highlight", 1000,function() {
//							tips.empty();
//									tips.html("",5000);
//							tips.addClass("ui-state-hover"); 
	
						});
//						tips.empty("",1500);
						
					}, 300);

				}

				function checkLength(o, n, min, max) {
					if (o.val().length == 0) {
						o.addClass("ui-state-error");
						updateTips(n +"不能为空");
						return false;
					}else if(o.val().length > max || o.val().length < min) {
						o.addClass("ui-state-error");
						updateTips("" + n + " 的长度必须在 " +
							min + " 和 " + max + " 之间。");
						return false;
					} else {
						return true;
					}
				}

				function checkRegexp(o, regexp, n) {
					if(!(regexp.test(o.val()))) {
						o.addClass("ui-state-error");
						updateTips(n);
						return false;
					} else {
						return true;
					}
				}
				
				function chechRepassword(o,n) {
					if((o.val() == "")){
						o.addClass("ui-state-error");
						n = "不能为空！";
						updateTips(n);
						return false;
					}else if(!(password.val() == o.val())) {
						o.addClass("ui-state-error");
						updateTips(n);
						return false;
					} else {
						return true;
					}
				}
				name.blur(function() {
					if (name.val() != "") {
						var bValid = true;
						bValid = bValid && checkLength(name, "昵称", 3, 16);
						bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。");
						if (bValid) {
						name.removeClass("ui-state-error");
						name.addClass("ui-state-hover");
						}
					}
					
				});
				password.blur(function() {
					if (password.val() != "") {
						var bValid = true;
						bValid = bValid && checkLength(password, "密码", 5, 16);
						bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9");
						if (bValid) {
						password.removeClass("ui-state-error");
						password.addClass("ui-state-hover");
						}
					}
					
				});
				repassword.blur(function() {
					if (repassword.val() != "") {
						var bValid = true;
						bValid = bValid && chechRepassword(repassword, "密码两次不一样");
						if (bValid) {
						repassword.removeClass("ui-state-error");
						repassword.addClass("ui-state-hover");
						}
					}
				});
				email.blur(function() {
					if (email.val() != "") {
						var bValid = true;
						bValid = bValid && checkLength(email, "email", 6, 80);
						bValid = bValid && checkRegexp(email, /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, "格式不对 eg. ui@jquery.com");
						if (bValid) {
						email.removeClass("ui-state-error");
						email.addClass("ui-state-hover");
						}
					}
					
				});
				
				$("#dialog-form").dialog({
					autoOpen: false,
					height: 330,
					width: 350,
					modal: true,
					buttons: {
						"注册帐户": function() {
                            var bValid = true;
							allFields.removeClass("ui-state-error");
							allFields.removeClass("ui-state-hover");

							bValid = bValid && checkLength(name, "昵称", 3, 16);
							bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "用户名必须由 a-z、0-9、下划线组成，且必须以字母开头。");
							bValid = bValid && checkLength(password, "密码", 5, 16);
							bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9");
							//		bValid = bValid && checkLength(repassword, "密码", 5, 16);
							bValid = bValid && chechRepassword(repassword, "密码两次不一样");
							bValid = bValid && checkLength(email, "email", 6, 80);
							bValid = bValid && checkRegexp(email, /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, "格式不对 eg. ui@jquery.com");


						}
					},
					close: function() {
//						tips.text("所有的表单字段都是必填的");//关闭后重置提示文本
						
						allFields.val("").removeClass("ui-state-error");
						allFields.val("").removeClass("ui-state-hover");
//						$(this).dialog("destroy"); 
					}
				});
				//			更改注册按钮样式
				$('.ui-dialog-buttonpane').find('button:contains("注册帐户")').css({
					"background-color":"#e78f08",
					width: 200,
					height: 40,
					color: "#fff",
					"margin-right": 65
				});

				
				
				$("#create-user")
					.button()
					.click(function() {
						updateTips("所有的表单字段都是必填的");
						$("#dialog-form").dialog("open");
					});
				
				$("#re_log").click(function() {
					$("#dialog-form").dialog("close");
					updateTips("欢迎登录");
					$("#login_form").dialog("open");
				});
					
	//			登录------------------------------------------------------------------
			
		$("#login_form").dialog({
					autoOpen: false,
					height: 330,
					width: 350,
					modal: true,
					buttons: {
						"登录帐户": function() {
                            var bValid = true;
							allFields.removeClass("ui-state-error");
							
							bValid = bValid && checkLength(name, "昵称", 3, 16);
							bValid = bValid && checkRegexp(name, /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, "用户名必须由字母、数字、_或汉字组成");
							bValid = bValid && checkLength(password, "密码", 5, 16);
							bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "密码字段只允许： a-z 0-9");
							//		bValid = bValid && checkLength(repassword, "密码", 5, 16);
							bValid = bValid && chechRepassword(repassword, "密码两次不一样");
							bValid = bValid && checkLength(email, "email", 6, 80);
							bValid = bValid && checkRegexp(email, /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, "格式不对 eg. ui@jquery.com");
//						
						}
						
					},
					close: function() {
						log_tips.text("欢迎登录");//关闭后重置提示文本
						jQuery("#log_name").val("");
						jQuery("#log_password").val("");
//						allFields.val("").removeClass("ui-state-error");
//						 $(this).dialog("destroy").remove(); 
					}
				});
				$('.ui-dialog-buttonpane').find('button:contains("登录帐户")').css({
					"background-color":"#e78f08",
					width: 200,
					height: 40,
					color: "#fff",
					"margin-right": 65
				});
//				.attr("disabled", "disabled");
				$("#log_user")
					.button()
					.click(function() {
						updateTips("欢迎登录");
						$("#login_form").dialog("open");
					});
					
				$("#re_rei").click(function() {
					$("#login_form").dialog("close");
					updateTips("所有的表单字段都是必填的");
					$("#dialog-form").dialog("open");
				});	
	//			------------------------------------------------------info------------
			
		$("#info_form").dialog({
					autoOpen: false,
					height: 530,
					width: 350,
					modal: true,
					buttons: {
						"确认修改": function() {
                            var bValid = true;
							allFields.removeClass("ui-state-error");
							bValid = bValid && checkLength(name, "昵称", 3, 16);
							bValid = bValid && checkRegexp(name, /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, "用户名必须由字母、数字、_或汉字组成");												
							bValid = bValid && checkRegexp(gender, /^[\u7537\u5973]+$/, "性别只能是男或女");
							bValid = bValid && checkLength(telephone, "电话", 11);
							bValid = bValid && checkLength(introduce, "简介", 0,50);
						
						}
						
					},
					close: function() {
						log_tips.text("修改你想修改的信息");//关闭后重置提示文本
						jQuery("#log_name").val("");
						jQuery("#log_password").val("");
//						allFields.val("").removeClass("ui-state-error");
//						 $(this).dialog("destroy").remove(); 
					}
				});
				$('.ui-dialog-buttonpane').find('button:contains("确认修改")').css({
					"background-color":"#e78f08",
					width: 200,
					height: 40,
					color: "#fff",
					"margin-right": 65
				});
//				.attr("disabled", "disabled");
				$("#alter_info")
					.button()
					.click(function() {
						updateTips("修改你想修改的信息");
						$("#info_form").dialog("open");
					});
					
				//			------------------------------------------------------password------------
			
		$("#password_form").dialog({
					autoOpen: false,
					height: 300,
					width: 350,
					modal: true,
					buttons: {
						"提交": function() {
                            var bValid = true;
							allFields.removeClass("ui-state-error");
							
						}
					},
					close: function() {
						log_tips.text("请输入你的原始密码");//关闭后重置提示文本
						jQuery("#log_name").val("");
						jQuery("#log_password").val("");
//						allFields.val("").removeClass("ui-state-error");
//						 $(this).dialog("destroy").remove(); 
					}
				});
				$('.ui-dialog-buttonpane').find('button:contains("提交")').css({
					"background-color":"#e78f08",
					width: 200,
					height: 40,
					color: "#fff",
					"margin-right": 65
				});
//				.attr("disabled", "disabled");
				$("#change_password")
					.button()
					.click(function() {
						updateTips("请输入你的原始密码");
						$("#password_form").dialog("open");
					});	
					
					
					
			});