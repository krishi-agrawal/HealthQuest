import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "./user-progress";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress activeCourse={{title:"Spanish",imageSrc:'/es.svg'}} points = {100}  hearts = {5} hasActiveSubscription={false}/>
        </StickyWrapper>
        <FeedWrapper>
          <Header title="Spanish"/> 
        </FeedWrapper>
    </div>
  );
}

export default LearnPage;