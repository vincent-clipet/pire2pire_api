# CONFIG
app_host=localhost:3000
route="/permission/1"
data="{}"



# RUN
echo "> Get permission '1'"
curl "$app_host$route"

echo
exit 0
