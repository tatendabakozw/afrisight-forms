import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { DocumentType } from "../utils/types";

interface GetDocumentParams {
  collectionName: string;
  id: string;
}

const documentCache: { [key: string]: DocumentType } = {};

const useSingleForm = ({ collectionName, id }: GetDocumentParams) => {
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheKey = `${collectionName}-${id}`;

    if (documentCache[cacheKey]) {
      setDocument(documentCache[cacheKey]);
      setLoading(false);
    } else {
      const fetchDocument = async () => {
        try {
          setLoading(true);
          const docRef = doc(db, collectionName, id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const docData = docSnap.data() as DocumentType;
            documentCache[cacheKey] = docData;
            setDocument(docData);
          } else {
            console.log("No such document!");
            setDocument(null);
          }
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchDocument();
    }
  }, [collectionName, id]);

  return { document, loading, error };
};

export default useSingleForm;
