# CONFIG
app_host=localhost:3000
route="/lesson/create"
data_json="./lesson_create.json"



# RUN
echo "> Create a new lesson"
curl -X POST -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
