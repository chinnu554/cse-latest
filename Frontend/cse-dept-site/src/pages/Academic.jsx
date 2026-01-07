import "./Academic.css"
function Academic(){
    return(
        <>
        <div>
            <h1 className="academic-h1">About the Department</h1>
            <div class="content">
                <ul>
                    <li>
                        The Department Of Computer Science And Engineering Was Established In The Year 2001.
                        Right From The Inception Of The College, With An Annual Intake Of 60 Students For B.Tech
                        Programme. Department Also Offers M.Tech Programme Namely M.Tech (CSE) With An Intake Of 18.
                    </li>

                    <li>
                        The Department Has A Both Experienced And Young Faculty. Majority Of The Faculty Members
                        Are Actively Involved In Improving Their Educational Qualifications And Actively Engaged
                        In Research Activity. The Faculties Have Been Attending Various Seminars, Workshops And
                        Training Programs Conducted By Various Other Reputed Organizations.
                    </li>

                    <li>
                        The Faculty Members Are Encouraged By The College Management By Providing Financial Support
                        To Attend And Participate In Workshops, Conferences And Seminars To Update Their Knowledge.
                        The Department Of Computer Science And Engineering Offers Various Research Areas:
                        <ul class="sub-list">
                            <li>Computer Networks</li>
                            <li>Big Data Technologies</li>
                            <li>Software Engineering</li>
                            <li>Python Programming</li>
                            <li>Artificial Intelligence</li>
                            <li>Soft Computing</li>
                            <li>Internet Of Things (IoTs)</li>
                        </ul>
                    </li>

                    <li>
                        The CSE Department Has Beautifully Designed Computer Laboratories Accommodating 200 Computer
                        Systems. All Laboratories Are Air Conditioned With A Power Backup Of 125 KVA DG Set To Help
                        Uninterrupted Functioning Of The Laboratories.
                    </li>

                    <li>
                        Licensed Softwares Like MSDN Academic Alliance Pack, MS - Office, SUSE LINUX Server,
                        Media Kit For Office Software Etc Are Made Available In The Laboratories. All The Systems
                        Are Connected Through LAN Facility: 20/100 MBPS Network Connections.
                    </li>
                </ul>
            </div>
        </div>
        <div className="academic-page">
        <h2>Coursed Offered</h2>
        <table>
        <tr>
            <th>Course</th>
            <th>Specialization</th>
            <th>Year Of Establishment</th>
            <th>Intake</th>
        </tr>

        <tr>
            <td>B.Tech</td>
            <td>COMPUTER SCIENCE AND ENGINEERING</td>
            <td>2001</td>
            <td>60</td>
        </tr>

        <tr>
            <td>M.Tech</td>
            <td>COMPUTER SCIENCE AND ENGINEERING</td>
            <td>2010</td>
            <td>18</td>
         </tr>
         </table>
        </div>
        
        </>
    );
}
export default Academic