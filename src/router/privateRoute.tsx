import { Navigate } from 'react-router-dom'
import MyRouteProp from './MyRouteProp'
import RoleRoute from './roleRoute'
interface Props {
  item: MyRouteProp
}
function PrivateRoute(props: Props) {
  const token = localStorage.getItem('token')
  if (token) {
    if (props.item.roles && props.item.roles.length > 0) {
      return <RoleRoute item={props.item} />
    } else {
      return <>{props.item.element}</>
    }
  } else {
    return <Navigate to={{pathname: '/login'}} />
  }
}

export default PrivateRoute
