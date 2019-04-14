import firebase from "firebase";

export const getPackagesPromise = () =>
  firebase
    .database()
    .ref("packages")
    .once("value")
    .then(snapshot => snapshot.val())
    .then(data =>
      Object.entries(data || {}).map(([id, value]) => ({
        id,
        ...value
      }))
    )

export const updatePackagePromise = (client_id, status) =>
  firebase
    .database()
    .ref("packages")
    .child(client_id)
    .update({
      status
    });
