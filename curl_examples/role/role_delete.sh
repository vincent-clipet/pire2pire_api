# CONFIG
app_host=localhost:3000
route="/role/3/delete"



# RUN
echo "> Delete role '3'"
curl -X DELETE "$app_host$route"

echo
exit 0