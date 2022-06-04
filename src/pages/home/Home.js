import classes from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

const Home = () => {
  const { user } = useAuthContext(); // user has unique 'uid' property which is different for every different user
  const { documents, error } = useCollection(
      "transactions",
      ["uid", "==", user.uid,],      // this parameter goes to place of 'where' method in useCollection hook
      ["createdAt", "desc"]     // createdAt comes from useFirestore, we created that const there and it is the time stamp for added document
      );

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={classes.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
