import React from "react";

const TermsOfServicePage = () => {
  return (
    <div className="px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Terms of Service</h1>
        <p className="mb-4">
          By accessing the Job Board website, you are agreeing to be bound by
          these terms of service, all applicable laws and regulations, and agree
          that you are responsible for compliance with any applicable local
          laws. If you do not agree with any of these terms, you are prohibited
          from using or accessing this site. The materials contained in this
          website are protected by applicable copyright and trademark law.
        </p>
        <h2 className="text-xl font-semibold mb-4">Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Job Board's website for
          personal, non-commercial transitory viewing only. This is the grant of
          a license, not a transfer of title, and under this license you may
          not:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>modify or copy the materials;</li>
          <li>
            use the materials for any commercial purpose, or for any public
            display (commercial or non-commercial);
          </li>
          <li>
            attempt to decompile or reverse engineer any software contained on
            Job Board's website;
          </li>
          <li>
            remove any copyright or other proprietary notations from the
            materials; or
          </li>
          <li>
            transfer the materials to another person or "mirror" the materials
            on any other server.
          </li>
        </ul>
        <p className="mb-4">
          This license shall automatically terminate if you violate any of these
          restrictions and may be terminated by Job Board at any time. Upon
          terminating your viewing of these materials or upon the termination of
          this license, you must destroy any downloaded materials in your
          possession whether in electronic or printed format.
        </p>
        <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
        <p className="mb-4">
          The materials on Job Board's website are provided on an 'as is' basis.
          Job Board makes no warranties, expressed or implied, and hereby
          disclaims and negates all other warranties including, without
          limitation, implied warranties or conditions of merchantability,
          fitness for a particular purpose, or non-infringement of intellectual
          property or other violation of rights.
        </p>
        <p className="mb-4">
          Further, Job Board does not warrant or make any representations
          concerning the accuracy, likely results, or reliability of the use of
          the materials on its website or otherwise relating to such materials
          or on any sites linked to this site.
        </p>
        <h2 className="text-xl font-semibold mb-4">Limitations</h2>
        <p className="mb-4">
          In no event shall Job Board or its suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit, or
          due to business interruption) arising out of the use or inability to
          use the materials on Job Board's website, even if Job Board or a Job
          Board authorized representative has been notified orally or in writing
          of the possibility of such damage. Because some jurisdictions do not
          allow limitations on implied warranties, or limitations of liability
          for consequential or incidental damages, these limitations may not
          apply to you.
        </p>
        <h2 className="text-xl font-semibold mb-4">Accuracy of materials</h2>
        <p className="mb-4">
          The materials appearing on Job Board's website could include
          technical, typographical, or photographic errors. Job Board does not
          warrant that any of the materials on its website are accurate,
          complete, or current. Job Board may make changes to the materials
          contained on its website at any time without notice. However, Job
          Board does not make any commitment to update the materials.
        </p>
        <h2 className="text-xl font-semibold mb-4">Modifications</h2>
        <p className="mb-4">
          Job Board may revise these terms of service for its website at any
          time without notice. By using this website you are agreeing to be
          bound by the then current version of these terms of service.
        </p>
        <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
        <p className="mb-4">
          These terms and conditions are governed by and construed in accordance
          with the laws of New York and you irrevocably submit to the exclusive
          jurisdiction of the courts in that State or location.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
