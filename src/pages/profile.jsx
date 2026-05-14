import { useState, useEffect } from "react";

export default function Profile() {
 const [savedCourses, setSavedCourses] = useState([]);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "Frontend Developer",
    bio: "",
    avatar: "",
  });

  const safeParse = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (error) {
      console.error("LocalStorage parse error:", error);
      return fallback;
    }
  };

  useEffect(() => {
    const storedUser = safeParse("techlib-user", null);
    if (storedUser) setUser(storedUser);

    const courses = safeParse("saved-courses", []);
    setSavedCourses(courses);

    const resources = safeParse("techlib-resources", []);
    setResourcesCount(resources.length);
  }, []);

   useEffect(() => {
    localStorage.setItem("techlib-user", JSON.stringify(user));
  }, [user]);

 const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-6 mt-20 pb-20">
        <h1 className="text-4xl font-bold mb-10">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex items-center gap-6 mb-8">
            <img
              src={
                user.avatar ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />

            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUser({ ...user, avatar: reader.result });
                  };
                  reader.readAsDataURL(file);
                }}
                className="border p-2 rounded-lg"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-500">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-2"
              />
            ) : (
              <p className="text-xl font-semibold mt-2">
                {user.name || "Your Name"}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-500">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">
                {user.email || "your@email.com"}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-500">Role</label>
            {isEditing ? (
              <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">{user.role}</p>
            )}
          </div>

          <div className="mb-8">
            <label className="text-sm text-gray-500">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl mt-2"
                rows="4"
              />
            ) : (
              <p className="text-gray-600 mt-2">
                {user.bio || "Write something about yourself..."}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {isEditing ? (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
        <button 
          onClick={() => alert("Admin dashboard coming soon!")}
          className="mt-10 bg-gray-600 text-white px-6 py-3 rounded-xl"
        >
           Go to
          admin dashboard
        </button>
      </main>
    </div>
  );
}