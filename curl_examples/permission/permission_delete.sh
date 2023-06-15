# CONFIG
app_host=localhost:3000
route="/permission/3/delete"



# RUN
echo "> Delete permission '3'"
curl -X DELETE "$app_host$route"

echo
exit 0