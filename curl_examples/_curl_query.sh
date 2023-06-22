##########
# CONFIG #
##########
http_method=$1
route=$2 # "/user/1"
json_file=$3

app_host=localhost:3000
login="admin"
password="admin"



#########
# SETUP #
#########
full_token=$(curl -s -X POST \
	-H "Content-Type: application/json" \
	-d '{"name": "'"$login"'", "password": "'"$password"'"}' \
	"$app_host/login" \
)
token=$(sed -E "s/.*token\"\:\"(.*)\"}/\1/" <<< "$full_token")
auth_header="Authorization: Bearer $token"
# echo "$auth_header"



#######
# RUN #
#######

if [ -z "$json_file" ]
then
    curl \
	-v \
	-H "$auth_header" \
	-X "$http_method" \
	"$app_host$route"
else
	curl \
	-v \
	-H "$auth_header" \
	-H "Content-Type: application/json" \
	-X "$http_method" \
	-d "@$json_file"\
	"$app_host$route"
fi

echo
exit 0