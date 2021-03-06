#!/bin/bash

# Kill all current fnotify sessions
ps | awk '{if($0 ~ /fnotify/ && $1 ~ /[0-9]+/ && $4 !~ /awk/) print $1}' |
while read id; do
kill $id
done

# SSH to host, clear file and listen for notifications
(ssh people -o PermitLocalCommand=no \
"> .irssi/fnotify; tail -f .irssi/fnotify" |
while read heading message; do
growlnotify -t "${heading}" -m "${message}";
done)&

#Connect to the remote server and reopen IRC
ssh -t people screen -raAd
