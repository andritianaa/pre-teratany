"use strict";(self.webpackChunkteratany_app=self.webpackChunkteratany_app||[]).push([[334],{8334:function(t,e,n){n.r(e),n.d(e,{LocalNotificationsWeb:function(){return f}});var i=n(4165),r=n(7762),a=n(5861),o=n(5671),s=n(3144),u=n(136),c=n(9388),f=function(t){(0,u.Z)(n,t);var e=(0,c.Z)(n);function n(){var t;return(0,o.Z)(this,n),(t=e.apply(this,arguments)).pending=[],t.deliveredNotifications=[],t.hasNotificationSupport=function(){if(!("Notification"in window)||!Notification.requestPermission)return!1;if("granted"!==Notification.permission)try{new Notification("")}catch(t){if("TypeError"==t.name)return!1}return!0},t}return(0,s.Z)(n,[{key:"getDeliveredNotifications",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){var e,n,a,o,s;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=[],n=(0,r.Z)(this.deliveredNotifications);try{for(n.s();!(a=n.n()).done;)o=a.value,s={title:o.title,id:parseInt(o.tag),body:o.body},e.push(s)}catch(i){n.e(i)}finally{n.f()}return t.abrupt("return",{notifications:e});case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"removeDeliveredNotifications",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(e){var n,a,o,s=this;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=(0,r.Z)(e.notifications),t.prev=1,o=(0,i.Z)().mark((function t(){var e,n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=a.value,null===(n=s.deliveredNotifications.find((function(t){return t.tag===String(e.id)})))||void 0===n||n.close(),s.deliveredNotifications=s.deliveredNotifications.filter((function(){return!n}));case 4:case"end":return t.stop()}}),t)})),n.s();case 4:if((a=n.n()).done){t.next=8;break}return t.delegateYield(o(),"t0",6);case 6:t.next=4;break;case 8:t.next=13;break;case 10:t.prev=10,t.t1=t.catch(1),n.e(t.t1);case 13:return t.prev=13,n.f(),t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[1,10,13,16]])})));return function(e){return t.apply(this,arguments)}}()},{key:"removeAllDeliveredNotifications",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){var e,n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=(0,r.Z)(this.deliveredNotifications);try{for(e.s();!(n=e.n()).done;)n.value.close()}catch(i){e.e(i)}finally{e.f()}this.deliveredNotifications=[];case 3:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"createChannel",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"deleteChannel",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"listChannels",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"schedule",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(e){var n,a,o;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.hasNotificationSupport()){t.next=2;break}throw this.unavailable("Notifications not supported in this browser.");case 2:n=(0,r.Z)(e.notifications);try{for(n.s();!(a=n.n()).done;)o=a.value,this.sendNotification(o)}catch(i){n.e(i)}finally{n.f()}return t.abrupt("return",{notifications:e.notifications.map((function(t){return{id:t.id}}))});case 5:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"getPending",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",{notifications:this.pending});case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"registerActionTypes",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"cancel",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(e){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.pending=this.pending.filter((function(t){return!e.notifications.find((function(e){return e.id===t.id}))}));case 1:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"areEnabled",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){var e,n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.checkPermissions();case 2:return e=t.sent,n=e.display,t.abrupt("return",{value:"granted"===n});case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"requestPermissions",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){var e;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.hasNotificationSupport()){t.next=2;break}throw this.unavailable("Notifications not supported in this browser.");case 2:return t.t0=this,t.next=5,Notification.requestPermission();case 5:return t.t1=t.sent,e=t.t0.transformNotificationPermission.call(t.t0,t.t1),t.abrupt("return",{display:e});case 8:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"checkPermissions",value:function(){var t=(0,a.Z)((0,i.Z)().mark((function t(){var e;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.hasNotificationSupport()){t.next=2;break}throw this.unavailable("Notifications not supported in this browser.");case 2:return e=this.transformNotificationPermission(Notification.permission),t.abrupt("return",{display:e});case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"transformNotificationPermission",value:function(t){switch(t){case"granted":return"granted";case"denied":return"denied";default:return"prompt"}}},{key:"sendPending",value:function(){var t,e,n=[],i=(new Date).getTime(),a=(0,r.Z)(this.pending);try{for(a.s();!(e=a.n()).done;){var o=e.value;(null===(t=o.schedule)||void 0===t?void 0:t.at)&&o.schedule.at.getTime()<=i&&(this.buildNotification(o),n.push(o))}}catch(s){a.e(s)}finally{a.f()}this.pending=this.pending.filter((function(t){return!n.find((function(e){return e===t}))}))}},{key:"sendNotification",value:function(t){var e,n=this;if(null===(e=t.schedule)||void 0===e?void 0:e.at){var i=t.schedule.at.getTime()-(new Date).getTime();return this.pending.push(t),void setTimeout((function(){n.sendPending()}),i)}this.buildNotification(t)}},{key:"buildNotification",value:function(t){var e=this,n=new Notification(t.title,{body:t.body,tag:String(t.id)});return n.addEventListener("click",this.onClick.bind(this,t),!1),n.addEventListener("show",this.onShow.bind(this,t),!1),n.addEventListener("close",(function(){e.deliveredNotifications=e.deliveredNotifications.filter((function(){return!e}))}),!1),this.deliveredNotifications.push(n),n}},{key:"onClick",value:function(t){var e={actionId:"tap",notification:t};this.notifyListeners("localNotificationActionPerformed",e)}},{key:"onShow",value:function(t){this.notifyListeners("localNotificationReceived",t)}}]),n}(n(6653).Uw)}}]);
//# sourceMappingURL=334.51536485.chunk.js.map