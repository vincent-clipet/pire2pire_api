# CONFIG
app_host=localhost:3000
route="/formation/create"
data_json="./formation_create.json"



# RUN
echo "> Create a new formation"
curl -X POST -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
