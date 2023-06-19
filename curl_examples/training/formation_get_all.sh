# CONFIG
app_host=localhost:3000
route="/trainings"
data="{}"



# RUN
echo "> Get all trainings"
curl "$app_host$route"

echo
exit 0
