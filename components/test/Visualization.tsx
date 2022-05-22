const Visualization = () => {
  return (
    <svg width={450} height={280}>
      <circle
        cx={280}
        cy={150}
        r={125}
        fill="yellow"
        stroke="black"
        strokeWidth="10"
      />
      <circle
        cx={240}
        cy={100}
        r={20}
      />
      <circle
        cx={320}
        cy={100}
        r={20}
      />
    </svg>
  );
};

export { Visualization };
