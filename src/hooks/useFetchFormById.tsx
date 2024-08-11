import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const useFetchFormByUserId = (userId: string) => {
  const [state, setState] = useState<{
    forms: any[];
    loading: boolean;
    error: string | null;
  }>({
    forms: [],
    loading: true,
    error: null,
  });

  const fetchForms = useCallback(async () => {
    if (!userId) {
      setState((prevState) => ({ ...prevState, loading: false }));
      return;
    }

    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const formsRef = collection(db, "forms");
      const q = query(formsRef, where("_id", "==", userId));
      const querySnapshot = await getDocs(q);

      const fetchedForms = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setState({ forms: fetchedForms, loading: false, error: null });
    } catch (err) {
      setState({ forms: [], loading: false, error: "Failed to fetch forms." });
      console.error("Error fetching forms:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  return state;
};

export default useFetchFormByUserId;
