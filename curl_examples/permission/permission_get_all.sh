# CONFIG
app_host=localhost:3000
route="/permissions"
data="{}"



# RUN
echo "> Get all permissions"
curl "$app_host$route"

echo
exit 0
