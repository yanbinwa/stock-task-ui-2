#!/bin/sh
set -e

export NAMESERVER=`cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' '`

# 获取本地IP
SELF_IP=`cat /etc/hosts | grep -E "^((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)\.){3}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)" | tail -1 | awk '{print $1}'`

echo ${CONSUL_URL}

#curl ${CONSUL_URL}/v1/agent/service/register -X PUT -i -H "Content-Type:application/json" -d '{
#"ID":"gemini_ta",
#"Name":"gemini_ta",
#"Tags":[],
#"Address":"'${SELF_IP}'",
#"Port":'${GEMINI_TA_UI_PORT}',
#"EnableTagOverride":false
#}'

# supervisord -c /etc/supervisord.conf
echo entrypoint.sh
echo /build/dist/run_nginx.sh $@
/build/dist/run_nginx.sh $@
