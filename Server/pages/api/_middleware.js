
import {NextResponse} from "next/server"
const middleware = (req, ev) => {
    if (req.method=== 'OPTIONS'){
        return new Response('Hello, world!')
    }
  };
  
  export default middleware;