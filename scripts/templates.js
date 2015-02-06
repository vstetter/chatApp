var templates = {};


templates.userList = [
'<article data-itemid="<%= _id %>">',
'<li>',
'<h3 class='userName'><%= user.name %></h3>',
'</li>',

].join("");


templates.messageTmpl = [
'<article data-messageid="<%=_id %>">',
'<p class='userMessage'><%= user.messages %></p>',

].join("");
