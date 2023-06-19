# CONFIG
app_host=localhost:3000
route="/training/3/delete"



# RUN
echo "> Delete training '3'"
curl -X DELETE "$app_host$route"

echo
exit 0