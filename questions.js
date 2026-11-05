// Questions live here (fixed). The AI only writes the ANSWERS.
// To add more: copy a block, give it a new unique id.
// Optional `context` is hidden from students and only sent to the AI
// (use it when a question refers to an Activity the AI can't see).
module.exports = {
  subject: 'Science',
  class: 10,
  chapter: { no: 1, title: 'Chemical Reactions and Equations' },
  sections: [
    {
      title: 'In-text Questions (page 6)',
      questions: [
        { id: 'c1-p6-1', no: 1, text: 'Why should a magnesium ribbon be cleaned before burning in air?' },
        {
          id: 'c1-p6-2', no: 2,
          text: 'Write the balanced equation for the following chemical reactions.',
          parts: [
            '(i) Hydrogen + Chlorine → Hydrogen chloride',
            '(ii) Barium chloride + Aluminium sulphate → Barium sulphate + Aluminium chloride',
            '(iii) Sodium + Water → Sodium hydroxide + Hydrogen'
          ]
        },
        {
          id: 'c1-p6-3', no: 3,
          text: 'Write a balanced chemical equation with state symbols for the following reactions.',
          parts: [
            '(i) Solutions of barium chloride and sodium sulphate in water react to give insoluble barium sulphate and the solution of sodium chloride.',
            '(ii) Sodium hydroxide solution (in water) reacts with hydrochloric acid solution (in water) to produce sodium chloride solution and water.'
          ]
        }
      ]
    },
    {
      title: 'In-text Questions (page 10)',
      questions: [
        {
          id: 'c1-p10-1', no: 1,
          text: 'A solution of a substance ‘X’ is used for white washing.',
          parts: [
            '(i) Name the substance ‘X’ and write its formula.',
            '(ii) Write the reaction of the substance ‘X’ named in (i) above with water.'
          ]
        },
        {
          id: 'c1-p10-2', no: 2,
          text: 'Why is the amount of gas collected in one of the test tubes in Activity 1.7 double of the amount collected in the other? Name this gas.',
          context: 'Activity 1.7 in the textbook is the electrolysis of water: water with a few drops of dilute sulphuric acid is electrolysed, and gas is collected in two test tubes over the two electrodes.'
        }
      ]
    },
    {
      title: 'In-text Questions (page 13)',
      questions: [
        { id: 'c1-p13-1', no: 1, text: 'Why does the colour of copper sulphate solution change when an iron nail is dipped in it?' },
        {
          id: 'c1-p13-2', no: 2,
          text: 'Give an example of a double displacement reaction other than the one given in Activity 1.10.',
          context: 'Activity 1.10 in the textbook is the reaction of sodium sulphate solution with barium chloride solution, forming a white precipitate of barium sulphate.'
        },
        {
          id: 'c1-p13-3', no: 3,
          text: 'Identify the substances that are oxidised and the substances that are reduced in the following reactions.',
          parts: [
            '(i) 4Na(s) + O₂(g) → 2Na₂O(s)',
            '(ii) CuO(s) + H₂(g) → Cu(s) + H₂O(l)'
          ]
        }
      ]
    },
    {
      title: 'Exercises',
      questions: [
        {
          id: 'c1-ex-1', no: 1,
          text: 'Which of the statements about the reaction below are incorrect?  2PbO(s) + C(s) → 2Pb(s) + CO₂(g)',
          options: [
            '(a) Lead is getting reduced.',
            '(b) Carbon dioxide is getting oxidised.',
            '(c) Carbon is getting oxidised.',
            '(d) Lead oxide is getting reduced.',
            '(i) (a) and (b)',
            '(ii) (a) and (c)',
            '(iii) (a), (b) and (c)',
            '(iv) all'
          ]
        },
        {
          id: 'c1-ex-2', no: 2,
          text: 'Fe₂O₃ + 2Al → Al₂O₃ + 2Fe.  The above reaction is an example of a',
          options: [
            '(a) combination reaction.',
            '(b) double displacement reaction.',
            '(c) decomposition reaction.',
            '(d) displacement reaction.'
          ]
        },
        {
          id: 'c1-ex-3', no: 3,
          text: 'What happens when dilute hydrochloric acid is added to iron fillings? Tick the correct answer.',
          options: [
            '(a) Hydrogen gas and iron chloride are produced.',
            '(b) Chlorine gas and iron hydroxide are produced.',
            '(c) No reaction takes place.',
            '(d) Iron salt and water are produced.'
          ]
        },
        { id: 'c1-ex-4', no: 4, text: 'What is a balanced chemical equation? Why should chemical equations be balanced?' },
        {
          id: 'c1-ex-5', no: 5,
          text: 'Translate the following statements into chemical equations and then balance them.',
          parts: [
            '(a) Hydrogen gas combines with nitrogen to form ammonia.',
            '(b) Hydrogen sulphide gas burns in air to give water and sulphur dioxide.',
            '(c) Barium chloride reacts with aluminium sulphate to give aluminium chloride and a precipitate of barium sulphate.',
            '(d) Potassium metal reacts with water to give potassium hydroxide and hydrogen gas.'
          ]
        },
        {
          id: 'c1-ex-6', no: 6,
          text: 'Balance the following chemical equations.',
          parts: [
            '(a) HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + H₂O',
            '(b) NaOH + H₂SO₄ → Na₂SO₄ + H₂O',
            '(c) NaCl + AgNO₃ → AgCl + NaNO₃',
            '(d) BaCl₂ + H₂SO₄ → BaSO₄ + HCl'
          ]
        },
        {
          id: 'c1-ex-7', no: 7,
          text: 'Write the balanced chemical equations for the following reactions.',
          parts: [
            '(a) Calcium hydroxide + Carbon dioxide → Calcium carbonate + Water',
            '(b) Zinc + Silver nitrate → Zinc nitrate + Silver',
            '(c) Aluminium + Copper chloride → Aluminium chloride + Copper',
            '(d) Barium chloride + Potassium sulphate → Barium sulphate + Potassium chloride'
          ]
        },
        {
          id: 'c1-ex-8', no: 8,
          text: 'Write the balanced chemical equation for the following and identify the type of reaction in each case.',
          parts: [
            '(a) Potassium bromide(aq) + Barium iodide(aq) → Potassium iodide(aq) + Barium bromide(s)',
            '(b) Zinc carbonate(s) → Zinc oxide(s) + Carbon dioxide(g)',
            '(c) Hydrogen(g) + Chlorine(g) → Hydrogen chloride(g)',
            '(d) Magnesium(s) + Hydrochloric acid(aq) → Magnesium chloride(aq) + Hydrogen(g)'
          ]
        },
        { id: 'c1-ex-9', no: 9, text: 'What does one mean by exothermic and endothermic reactions? Give examples.' },
        { id: 'c1-ex-10', no: 10, text: 'Why is respiration considered an exothermic reaction? Explain.' },
        { id: 'c1-ex-11', no: 11, text: 'Why are decomposition reactions called the opposite of combination reactions? Write equations for these reactions.' },
        { id: 'c1-ex-12', no: 12, text: 'Write one equation each for decomposition reactions where energy is supplied in the form of heat, light or electricity.' },
        { id: 'c1-ex-13', no: 13, text: 'What is the difference between displacement and double displacement reactions? Write equations for these reactions.' },
        { id: 'c1-ex-14', no: 14, text: 'In the refining of silver, the recovery of silver from silver nitrate solution involved displacement by copper metal. Write down the reaction involved.' },
        { id: 'c1-ex-15', no: 15, text: 'What do you mean by a precipitation reaction? Explain by giving examples.' },
        {
          id: 'c1-ex-16', no: 16,
          text: 'Explain the following in terms of gain or loss of oxygen with two examples each.',
          parts: ['(a) Oxidation', '(b) Reduction']
        }
      ]
    }
  ]
};
