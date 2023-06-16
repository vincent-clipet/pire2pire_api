# CONFIG
app_host=localhost:3000
route="/lesson/3/delete"



# RUN
echo "> Delete lesson '3'"
curl -X DELETE "$app_host$route"

echo
exit 0