import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "./user-progress";
import { getUserProgress, getUnits } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  try {
    console.log("Fetching user progress and units...");

    // Fetch user progress and units concurrently
    const [userProgress, units] = await Promise.all([getUserProgress(), getUnits()]);

    console.log("User Progress:", userProgress);
    console.log("Units:", units);

    // Redirect if no active course
    if (!userProgress || !userProgress.activeCourse) {
      console.log("No active course found, redirecting to /courses");
      return redirect("/courses");
    }

    // Return page content
    return (
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress 
            activeCourse={userProgress.activeCourse} 
            points={userProgress.points}  
            hearts={userProgress.hearts} 
            hasActiveSubscription={false} 
          />
        </StickyWrapper>
        <FeedWrapper>
          <Header title={userProgress.activeCourse.title}/> 
          {units.map((unit) => (
            <div key={unit.id} className="mb-10">
              {JSON.stringify(unit)}
            </div>
          ))}
        </FeedWrapper>
      </div>
    );

  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching data:", error);

    // Optionally, redirect to an error page or show an error message
    return redirect("/error");
  }
}

export default LearnPage;
