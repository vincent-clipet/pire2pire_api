# CONFIG
app_host=localhost:3000
route="/roles"
data="{}"



# RUN
echo "> Get all roles"
curl "$app_host$route"

echo
exit 0
