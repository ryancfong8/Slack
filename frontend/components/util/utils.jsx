import React, { useRef, useEffect } from 'react';

// Hook
export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function getChannelName(channel, currentUserId) {
  let channelName = channel.name;
  if (channel.channel_type === 'direct' || !channel.name) {
    channelName = channel.members.filter(member => member.id !== currentUserId).map(member => member.username);
    channelName.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    channelName = channelName.join(', ');
  }
  return channelName;
}

export function arraysEqual(_arr1, _arr2) {
  if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) return false;

  var arr1 = _arr1.concat().sort();
  var arr2 = _arr2.concat().sort();

  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}
