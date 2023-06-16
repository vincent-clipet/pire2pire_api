# CONFIG
app_host=localhost:3000
route="/role/4/delete"



# RUN
echo "> Delete role '4'"
curl -X DELETE "$app_host$route"

echo
exit 0