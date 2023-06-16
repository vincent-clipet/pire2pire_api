# CONFIG
app_host=localhost:3000
route="/lesson/1"



# RUN
echo "> Get lesson '1'"
curl "$app_host$route"

echo
exit 0
