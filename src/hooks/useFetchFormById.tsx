import { useState, useEffect, useCallback } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DocumentType, FormType } from "@/utils/types";

const useFetchFormByUserId = (userId: string) => {
  const [state, setState] = useState<{
    forms: FormType[];
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

      const fetchedForms: FormType[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as DocumentType;

        // Ensure the data has the expected structure
        const { description, name, sections } = data;

        return {
          id: doc.id,
          form: {
            description: description || "",
            name: name || "",
            sections: sections || [],
          },
        };
      });

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
