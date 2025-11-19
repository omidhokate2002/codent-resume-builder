import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

const ResumeContext = createContext();

const initialState = {
  id: "",
  resumeData: [],
  fetchData: () => {},
};

export const ResumeContextProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialState.resumeData);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Only fetch if user is authenticated
      if (!isAuthenticated || !token) {
        setResumeData([]);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/resume", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      // Check if the response is successful and contains an array
      if (response.ok && Array.isArray(data)) {
        setResumeData(data);
      } else if (response.ok && data.success && Array.isArray(data.data)) {
        // If the API returns {success: true, data: [...]}
        setResumeData(data.data);
      } else {
        // Handle error responses or non-array data
        console.log('API Response:', data);
        if (data.error === "Not authorized, no token") {
          // User is not authenticated, set empty array
          setResumeData([]);
        } else {
          // Other error, set empty array as fallback
          setResumeData([]);
        }
      }
    } catch (error) {
      console.log('Fetch error:', error);
      setResumeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const context = {
    resumeData,
    setResumeData,
    fetchData,
    isLoading,
    setIsLoading,
  };

  return (
    <ResumeContext.Provider value={context}>{children}</ResumeContext.Provider>
  );
};

export const useResumeContext = () => useContext(ResumeContext);
