var templates = {};


templates.userList = [



'<li data-itemid="<%= _id %>">',
'<h3 class="userName"><%= userName %></h3>',
'<a class="logout" href="">Log Out</a>',
'</li>'


].join("");


templates.messageTmpl = [
'<p><%= userInfo.userName %></p>',
'<p class="userMessage"><%= newChatMessage %></p>',

].join("");
