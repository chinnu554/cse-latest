import SEO from "../components/SEO";
import "./Academic.css";

function Academic() {
    return (
        <>
            <SEO
                title="Academic"
                description="Overview of the Computer Science and Engineering Department, programs offered, infrastructure, and research areas."
                keywords="Academic, CSE Department, B.Tech, M.Tech, Artificial Intelligence, Data Science"
            />

            <div>
                <h1 className="academic-h1">About the Department</h1>

                <div className="content">
                    <ul>
                        <li>
                            The Department of Computer Science and Engineering (CSE) was established in the year 2001,
                            at the inception of the institution. The department offers an undergraduate programme,
                            B.Tech in Computer Science and Engineering, with an approved annual intake of 180 students.
                        </li>

                        <li>
                            In line with emerging industry requirements and rapid technological advancements, the
                            department has expanded its academic offerings by introducing the following specialized
                            undergraduate programmes from the academic year 2025:
                            <ul className="sub-list">
                                <li>
                                    B.Tech – Computer Science and Engineering (Artificial Intelligence & Data Science)
                                    with an intake of 60 students
                                </li>
                                <li>
                                    B.Tech – Computer Science and Engineering (Artificial Intelligence & Machine Learning)
                                    with an intake of 60 students
                                </li>
                                <li>
                                    B.Tech – Computer Science and Engineering (Artificial Intelligence)
                                    with an intake of 60 students
                                </li>
                            </ul>
                        </li>

                        <li>
                            The department also offers a postgraduate programme, M.Tech in Computer Science and
                            Engineering, which was established in the year 2012 with an approved intake of 18 students.
                        </li>

                        <li>
                            The department is supported by a team of qualified, experienced, and young faculty members
                            who actively engage in teaching, research, and professional development activities. Faculty
                            members continuously enhance their academic credentials and contribute to research through
                            publications, seminars, workshops, conferences, and faculty development programs. The
                            management encourages faculty development by providing financial support for attending
                            academic and research events.
                        </li>

                        <li>
                            The department emphasizes outcome-based education (OBE) and focuses on contemporary and
                            interdisciplinary research areas. The major research and thrust areas include:
                            <ul className="sub-list">
                                <li>Computer Networks</li>
                                <li>Big Data Technologies</li>
                                <li>Software Engineering</li>
                                <li>Python Programming</li>
                                <li>Artificial Intelligence</li>
                                <li>Soft Computing</li>
                                <li>Internet of Things (IoTs)</li>
                            </ul>
                        </li>

                        <li>
                            The CSE department has well-established computing infrastructure with modern computer
                            laboratories accommodating approximately 200 computer systems. All laboratories are
                            air-conditioned and supported by a 125 KVA DG set, ensuring uninterrupted power supply for
                            academic and research activities.
                        </li>

                        <li>
                            The laboratories are equipped with licensed and open-source software tools such as MSDN
                            Academic Alliance Pack, MS Office, SUSE Linux Server, and other essential software platforms.
                            All systems are interconnected through a LAN facility with 20/100 Mbps network connectivity,
                            enabling effective hands-on learning, project development, and research work.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="academic-page">
                <h2>Courses Offered</h2>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Specialization</th>
                                <th>Year of Establishment</th>
                                <th>Intake</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>B.Tech</td>
                                <td>Computer Science and Engineering</td>
                                <td>2001</td>
                                <td>180</td>
                            </tr>

                            <tr>
                                <td>B.Tech</td>
                                <td>CSE (Artificial Intelligence & Data Science)</td>
                                <td>2025</td>
                                <td>60</td>
                            </tr>

                            <tr>
                                <td>B.Tech</td>
                                <td>CSE (Artificial Intelligence & Machine Learning)</td>
                                <td>2025</td>
                                <td>60</td>
                            </tr>

                            <tr>
                                <td>B.Tech</td>
                                <td>CSE (Artificial Intelligence)</td>
                                <td>2025</td>
                                <td>60</td>
                            </tr>

                            <tr>
                                <td>M.Tech</td>
                                <td>Computer Science and Engineering</td>
                                <td>2012</td>
                                <td>18</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Academic;
