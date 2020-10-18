#!/bin/bash

RES=$(curl -s http://127.0.0.1:$STOCK_TASK_UI_PORT -o /build/dist/hc.log && cat /build/dist/hc.log | grep -E "(Error|\"error\")")

if [ -z "$RES" ]; then
    exit 1
else
    exit 0
fi
