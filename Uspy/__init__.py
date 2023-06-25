from mixpanel import Mixpanel
 
mp = Mixpanel("e963326114997c2ab37f59babee4f22e")
 
# Note: you must supply the user_id who performed the event as the first parameter.
mp.track(user_id, 'Signed Up',  {
  'Signup Type': 'Referral'
})
