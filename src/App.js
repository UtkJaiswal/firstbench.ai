import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/elements/navbar";
import DebateTopic from './features/TownHall/debateIntro'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IntroTownhall from "./features/TownHall/IntroTownhall";
import Townhall from "./features/TownHall/townhall";
import ResultPage from "./features/TownHall/resultPage";
import BetaPage from "./features/AiEvaluation/betaPage"
import SelectTopic from "./components/organisms/SelectTopic";
import SelectSubject from "./features/TownHall/selectSubject";
import AiEvaluation from "./features/AiEvaluation/AiEvaluation";
import AIEvaluationGuide from "./features/AiEvaluation/AIEvaluationGuide";
import Register from "./pages/Register";
import OTPVerification from "./pages/otpVerification";
import PhotoGallery from "./features/AiEvaluation/selectPhotos"
import DragAndDrop from "./components/organisms/DragAndDrop";
import LoginScreen from "./pages/Login";
import Dashboard from "./features/AiEvaluation/evalDashboard";
import MultiStepForm from "./features/MockTest/UserSurvey";
import PracticeTest from "./features/MockTest/PracticeTest/PracticeTest";
import MockTest from "./features/MockTest/MockTest";
import Questions from "./features/MockTest/questionsOMR";
import MockTestResult from "./features/MockTest/ResultQuestion";
import Entry from "./features/MockTest/Entry";

function App() {
  return (
    <div className="font-manrope">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/firstguru" element={<BetaPage />} />
          <Route path="/performance" element={<BetaPage />} />
          <Route path="/ai_evaluation" element={<AiEvaluation />} />
          <Route
            path="/ai_evaluation/drag-and-drop"
            element={<DragAndDrop />}
          />
          <Route
            path="/ai_evaluation/drag-and-drop/aievaluationguide"
            element={<AIEvaluationGuide />}
          />
          <Route path="/townhall" element={<IntroTownhall />} />
          <Route path="/townhall/subject" element={<SelectSubject />} />
          <Route path="/townhall/topic" element={<SelectTopic />} />
          <Route path="/townhall/topic/debateTopic" element={<DebateTopic />} />
          <Route path="/townhall/:id" element={<Townhall />} />
          <Route path="/townhall/result" element={<ResultPage />} />
          <Route path="/ai_evaluation/photos" element={<PhotoGallery />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/questionnaire" element={<MultiStepForm />} />
          <Route path="/ai_evaluation/evaluation" element={<Dashboard />} />
          <Route path="/mocktest_point" element={<Entry/>}/>
          <Route path="/practice_test" element={<PracticeTest />} />
          <Route path="/mocktest" element={<MockTest />} />
          <Route path="/omr" element={<Questions/>} />
          <Route path="/mockfinal" element={<MockTestResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
