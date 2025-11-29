import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import { RefreshCcw, ExternalLink, Activity, Code, HardHat, FileText, Loader2 } from 'lucide-react';

// Mock data structure for the projects
const mockProjects = [
    {
        id: 1,
        title: "NicheLens Feature Matrix Test",
        description: "A comprehensive test harness for the core feature matrix, showcasing complex data structures and real-time validation.",
        status: "In Development",
        tags: ["Go", "React", "Testing", "Data Visualization"],
        lastUpdated: "2024-11-20"
    },
    {
        id: 2,
        title: "Collaborative Chat Interface",
        description: "Real-time communication app built with Firestore and React, demonstrating secure authentication and real-time updates.",
        status: "Completed",
        tags: ["React", "Firebase", "WebSockets", "UI/UX"],
        lastUpdated: "2024-10-15"
    },
    {
        id: 3,
        title: "3D Physics Simulator",
        description: "Interactive simulation using Three.js and Cannon.js, exploring complex planetary motion and collision detection.",
        status: "Completed",
        tags: ["Three.js", "JavaScript", "Physics", "3D"],
        lastUpdated: "2024-09-01"
    }
];

// DemoPage component for internal routes
const DemoPage = () => {
    const { id } = useParams();
    const project = mockProjects.find(p => p.id === parseInt(id));

    if (!project) {
        return <div className="p-8 text-center text-gray-600">Project not found.</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{project.title} Demo</h2>
            <p className="mb-6 text-gray-700">{project.description}</p>
            <div className="text-blue-600 hover:underline">
                {/* Example content - you can replace with real embedded demo */}
                Live demo placeholder for project #{project.id}.
            </div>
            <div className="mt-6">
                <Link to="/" className="text-blue-600 hover:underline">← Back to Project List</Link>
            </div>
        </div>
    );
};

// Helper component for a single project card
const ProjectCard = ({ project }) => {
    const isCompleted = project.status.includes('Completed');
    const statusColor = isCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    const StatusIcon = isCompleted ? Activity : HardHat;
    const tagIconMap = {
        'React': <Code className="w-3 h-3 text-blue-500 mr-1" />,
        'Firebase': <FileText className="w-3 h-3 text-yellow-500 mr-1" />,
        // Add more mappings for custom icons if needed
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center ${statusColor}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {project.status}
                </span>
            </div>
            
            <p className="text-gray-600 mb-4 flex-grow text-sm">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                    <span key={index} className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex items-center">
                        {tagIconMap[tag]}
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">Last Update: {project.lastUpdated}</span>
                <Link
                    to={`/demo/${project.id}`}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-150 group"
                >
                    View Demo
                    <ExternalLink className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
};

// Main App Component
const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulate API call to fetch project data
    const fetchProjects = useCallback(() => {
        setLoading(true);
        setError(null);

        setTimeout(() => {
            try {
                setProjects(mockProjects);
            } catch (err) {
                console.error("Failed to load project data:", err);
                setError("Could not load project data. Please check the network connection.");
            } finally {
                setLoading(false);
            }
        }, 1500);
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <div className="min-h-screen p-4 sm:p-8">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                        background-color: #f7f9fb;
                    }
                    .card-shadow {
                        box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
                    }
                `}
            </style>
            
            <header className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-3 sm:mb-0">
                    Project Showcase 
                    <span className="text-sm font-normal text-blue-600 ml-2">(Private Access)</span>
                </h1>
                <div id="authStatus" className="flex items-center space-x-2 text-sm bg-white p-2 rounded-lg shadow-inner">
                    <span className="text-gray-500">Recruiter Access:</span>
                    <span className="font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">Authorized</span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-semibold text-gray-700">Deployed Artifacts</h2>
                    <button 
                        onClick={fetchProjects}
                        disabled={loading}
                        className="flex items-center text-sm px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCcw className={`w-3 h-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
                
                {loading && (
                    <div id="loadingIndicator" className="text-center p-12">
                        <Loader2 className="animate-spin h-8 w-8 text-blue-500 mx-auto" />
                        <p className="mt-3 text-gray-500">Loading project data...</p>
                    </div>
                )}

                {error && (
                    <div id="errorMessage" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-8 card-shadow" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div id="projectContainer" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="text-center p-12 bg-white rounded-xl shadow-lg mt-8">
                        <p className="text-gray-500 text-lg">No projects found for this private portfolio.</p>
                        <button 
                            onClick={fetchProjects}
                            className="mt-4 text-blue-600 hover:underline font-medium"
                        >
                            Try refreshing the data
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

const App = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/demo/:id" element={<DemoPage />} />
        </Routes>
    </HashRouter>
);

export default App;