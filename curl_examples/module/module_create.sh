# CONFIG
app_host=localhost:3000
route="/module/create"
data_json="./module_create.json"



# RUN
echo "> Create a new module"
curl -X POST -H "Content-Type: application/json" -d @$data_json "$app_host$route"
echo
exit 0
