http_method="POST"
route="/user/signup"
json_file="./json_data/user_create.json"

./_curl_query.sh $http_method $route $json_file