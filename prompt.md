No using authService integrate them into auth forms in /auth/components after that
signup_complete -> after verification done -> move to onboarding screens where upsert_company_profile (payload:{
company_name
company_email
website_url
registration_number
phone_number
address
logo
})

and then select_subscription_plan (payload:{
p_plan_id:random_uuid for now
})
then profile_complete

You should knnow that upsert_company_profile, select_subscription_plan and profile_complete are RPC so create them in necessary service files.
