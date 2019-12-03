import store from '@/store'

export function setNavActiveItem(routePath) {
  let pathStr = routePath.substring(1)
  const pathArr = pathStr.split('/')
  const path1 = pathArr[0]
  const path2 = pathArr[1]
  const path3 = pathArr[2]
  console.log(pathArr)
  console.log('path1', path1)
  console.log('path2', path2)
  console.log('path3', path3)

  if(path1 == 'home') {
    store.state.topNavActive = path1
    store.state.leftNavOpen = []
    store.state.leftNavActive = null
  }else if(path1 == 'my') {
    store.state.topNavActive = 'home'
    store.state.leftNavOpen = []
    store.state.leftNavActive = null
    store.state.myNavActive = `${path1}_${path2}`

    store.state.topNavList.forEach(item => {
      if(item.name == 'home') {
        let navList = item.subNav[0]['subNav']
        store.state.myNavList = navList
        console.log('myNavList', navList)
      }
    })
  }else{
    path1 ? (store.state.topNavActive = path1) : null
    path2 ? (store.state.leftNavOpen = [path2]) : null
    path3 ? (store.state.leftNavActive = `${path2}_${path3}`) : null  //当前active routeName 为 path2+"_"+path3
    store.state.myNavActive = null
    
    store.state.topNavList.forEach(item => {
      if(item.name == path1) {
        store.state.leftNavList = item.subNav
        console.log('aaa', item.subNav)
      }
      if(item.name == 'home') {
        let navList = item.subNav[0]['subNav']
        store.state.myNavList = navList
        console.log('myNavList', navList)
      }
    })
  }
  console.log();
}
