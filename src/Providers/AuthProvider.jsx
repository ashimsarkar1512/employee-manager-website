import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";

export const AuthContext= createContext(null)

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);


const AuthProvider = ({children}) => {
            const [user,setUser] =useState(null)
            const [loading,setLoading]=useState(true)

            const createUser=(email,password)=>{
                          setLoading(true)
                           return createUserWithEmailAndPassword(auth,email,password)
                       }


                       const logOut=()=>{
                        setLoading(true)
                        return signOut(auth);
                      }

                       const signInUser=(email,password)=>{
                        setLoading(true)
                        return signInWithEmailAndPassword(auth,email,password)
                       }

                        
                       const googleLogin=()=>{
                        setLoading(true)
                        return signInWithPopup(auth, googleProvider)
          
                       }

                       const updateUserProfile=(name,photo)=>{
                        return updateProfile(auth.currentUser,{
                          displayName:name, photoURL:photo
          
                        })
                      }
                     



                       useEffect(()=>{
                        const unSubscribe =  onAuthStateChanged(auth,currentUser=>{
                             console.log('user in the on state chance',currentUser);
                             setUser(currentUser)
                             setLoading(false)
                          })
                          return()=>{
                             unSubscribe();
                          }
                         },[])

                        
          


            const authInfo={
                        user,
                        createUser,
                        signInUser,
                        googleLogin,
                       
                        logOut,
                       
                        loading,
                        updateUserProfile
  
            }
            return (
                       
                          <AuthContext.Provider value={authInfo}>
                           {children}
                          </AuthContext.Provider>     
                       
            );
};

export default AuthProvider;