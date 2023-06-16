# CONFIG
app_host=localhost:3000
route="/module/3/delete"



# RUN
echo "> Delete module '3'"
curl -X DELETE "$app_host$route"

echo
exit 0