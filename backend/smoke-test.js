(async()=>{
  try{
    const base='http://localhost:3000'
    const fetch = global.fetch
    const log = msg=>console.log(msg)

    // Public posts
    const p=await fetch(base+'/api/cms/posts')
    log('PUBLIC_POSTS:'+await p.text())

    // Settings
    const s=await fetch(base+'/api/cms/settings')
    log('PUBLIC_SETTINGS:'+await s.text())

    // Login
    const login = await fetch(base+'/api/auth/login',{
      method:'POST',
      headers:{'content-type':'application/json'},
      body: JSON.stringify({ email: 'admin@a1construction.co.in', password: 'Admin@2024' })
    })
    const loginJson = await login.json()
    log('LOGIN_JSON:'+JSON.stringify(loginJson))
    if(!loginJson.token){ console.error('No token returned'); process.exit(1) }

    const token = loginJson.token
    log('TOKEN:'+token)

    // Dashboard (admin)
    const dash = await fetch(base+'/api/admin/cms/dashboard', { headers: { Authorization: 'Bearer '+token } })
    log('DASHBOARD:'+await dash.text())

    // Create a post
    const now = Date.now()
    const newPost = await fetch(base+'/api/admin/cms/posts',{
      method:'POST',
      headers:{'content-type':'application/json', Authorization: 'Bearer '+token},
      body: JSON.stringify({ title: 'Smoke Test Post '+now, slug: 'smoke-test-'+now, excerpt: 'Automated smoke test', content: '<p>ok</p>', type: 'post', status: 'published', author_id: 1 })
    })
    log('CREATE_POST:'+await newPost.text())

    process.exit(0)
  }catch(err){ console.error(err); process.exit(1) }
})()
