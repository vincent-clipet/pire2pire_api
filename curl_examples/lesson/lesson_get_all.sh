# CONFIG
app_host=localhost:3000
route="/lessons"
data="{}"



# RUN
echo "> Get all lessons"
curl "$app_host$route"

echo
exit 0
