import { useEffect, useState } from 'react'

const useFirebaseAuthentication = (firebase: any) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() =>{
    const unListen = firebase.auth().onAuthStateChanged(
      (authUser: any) => {
        authUser
          ? setAuthUser(authUser)
          : setAuthUser(null);
      },
    );
    return () => {
      unListen();
    }
  });

  return authUser
}

export default useFirebaseAuthentication;