# CONFIG
app_host=localhost:3000
route="/formation/3/delete"



# RUN
echo "> Delete formation '3'"
curl -X DELETE "$app_host$route"

echo
exit 0